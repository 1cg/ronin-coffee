package ronin_coffee;

import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.Global;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

public class CoffeeCompiler {

  public String compile(String coffeeCode) {
    Context cx = Context.enter();
    Scriptable scope;
    try {
      Global global = new Global();
      global.init(cx);
      scope = cx.initStandardObjects(global);
      cx.setOptimizationLevel(-1);

      // import coffee script
      URL lessDist = CoffeeCompiler.class.getResource("coffee-script-1.2.0.js");
      InputStream in = lessDist.openStream();
      cx.evaluateReader(scope, new InputStreamReader(in), lessDist.toString(), 1, null);
      in.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    //invoke coffee compiler
    Object result = cx.evaluateString(scope, "CoffeeScript.compile(\"" + ScriptRuntime.escapeString(coffeeCode) + "\");", "RoninCoffee.js", 1, null);
    return result.toString();
  }

}
