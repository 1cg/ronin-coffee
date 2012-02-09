package ronin_coffee

uses javax.servlet. *;
uses javax.servlet.http.HttpServletRequest;
uses java.io.IOException;
uses java.io.InputStream;
uses java.util.Scanner;
uses gw.util.concurrent.Cache
uses java.util.concurrent.ConcurrentHashMap
uses com.sun.tools.javac.resources.compiler
uses java.util.concurrent.atomic.AtomicInteger

class CoffeeFilter implements Filter {

  var _cache = new ConcurrentHashMap<String, String>()
  var _shouldCache : Boolean as Cache
  var _compileCount : AtomicInteger as Compilations = new AtomicInteger()
  
  override function init(cfg: FilterConfig) {
    // nothing
  }

  override function doFilter(servletRequest: ServletRequest, servletResponse: ServletResponse, filterChain: FilterChain) {
    var req = servletRequest as HttpServletRequest
    var contextPath = req.PathInfo
    if (contextPath?.endsWith(".coffee")) {      
      if(req.getParameter("raw") != null) {
        var lessSource = getLessSource(req)
        servletResponse.getOutputStream().write(lessSource.Bytes)
      } else {
        var result : String    
        if(_shouldCache) {
          result = _cache[contextPath]
          if(result == null){
            using(this as IMonitorLock) {
              result = _cache[contextPath]
              if(result == null) {
                result = compile(req)
                _cache[contextPath] = result
              }
            }
          }
        } else {
          result = compile(req)
        }
        servletResponse.getOutputStream().write(result.Bytes)
      }
    } else {
      filterChain.doFilter(req, servletResponse)
    }
  }
  
  function compile(req: HttpServletRequest) : String {
    _compileCount.incrementAndGet()
    var lessSource = getLessSource(req)
    var c = new CoffeeCompiler()
    return c.compile(lessSource)
  }

  function getLessSource(req: HttpServletRequest): String {
    var resourceAsStream = req.ServletContext.getResourceAsStream(req.ServletPath + "/" + req.PathInfo)
    return new Scanner(resourceAsStream).useDelimiter("\\A").next()
  }

  override function destroy() {
    //nothing
  }
}