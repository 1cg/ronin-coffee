uses gw.lang.parser.template.IEscapesAllContent

uses gw.lang.reflect.IType

uses java.io.Writer

uses gw.lang.parser.template.StringEscaper

uses gw.lang.parser.template.ITemplateObserver

uses javax.servlet.http.HttpServlet

uses org.mortbay.jetty.servlet.Context
uses org.mortbay.jetty.bio.SocketConnector
uses org.mortbay.jetty.servlet.*
uses org.mortbay.jetty.Server
uses ronin_coffee.*

var coffeeFilter = new CoffeeFilter()

// Create server and root context
var server = new Server()
var connector = new SocketConnector()
connector.setPort(8080)
server.addConnector(connector)
var context = new Context(server, "/", Context.SESSIONS)

// Add the default servlet 
context.addServlet(new ServletHolder(new DefaultServlet()), "/*")

var escaperImpl : IEscapesAllContent

var coffeeImpl = new IReentrant() {
  override function enter() {
    escaperImpl = new CoffeeEscaper()
  }

  override function exit() {
    escaperImpl = null
  }
}

var observer = new ITemplateObserver() {
  override function beforeTemplateRender(t: IType, w: Writer): boolean {
    return true
  }

  override property get Escaper(): StringEscaper {
    return new IEscapesAllContent() {
      override function escape(p0: String): String {
        if(escaperImpl == null) {
          return p0
        } else {
          return escaperImpl.escape(p0)
        }
      }

      override function escapeBody(p0: java.lang.String): java.lang.String {
        if(escaperImpl == null) {
          return p0
        } else {
          return escaperImpl.escapeBody(p0)
        }
      }
    }
  }

  override function afterTemplateRender(t: IType, w:Writer) {
  }
}


context.addServlet(new ServletHolder(new HttpServlet(){
  override function service(req: javax.servlet.ServletRequest, res: javax.servlet.ServletResponse) {
    ITemplateObserver.ACCESS.pushTemplateObserver(observer)
    ExampleTemplate.render(res.Writer, coffeeImpl )
    ITemplateObserver.ACCESS.popTemplateObserver()
  }
}), "/template_test")
context.ResourceBase = "."

// Add less filter
context.addFilter(new FilterHolder(coffeeFilter), "/*", org.mortbay.jetty.Handler.DEFAULT)

// Start server
server.start()
server.join()