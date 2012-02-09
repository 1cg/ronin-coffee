package ronin_coffee;

import junit.framework.TestCase;

public class CoffeeCompilerTest extends TestCase {
  
  public void testBootstrap() {
    CoffeeCompiler c = new CoffeeCompiler();
    assertEquals("(function() {\n  1;\n}).call(this);\n", c.compile("1"));
    assertEquals("(function() {\n  true;\n}).call(this);\n", c.compile("true"));
    assertEquals("(function() {\n  1 + 1;\n}).call(this);\n", c.compile("1 + 1"));
  }

}
