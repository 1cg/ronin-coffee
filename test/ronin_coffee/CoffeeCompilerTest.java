package ronin_coffee;

import junit.framework.TestCase;

public class CoffeeCompilerTest extends TestCase {
  
  public void testBootstrap() {
    CoffeeCompiler c = new CoffeeCompiler();
    assertEquals("1", c.compile("1"));
  }

}
