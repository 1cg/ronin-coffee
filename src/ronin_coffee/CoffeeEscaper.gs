package ronin_coffee

class CoffeeEscaper implements gw.lang.parser.template.IEscapesAllContent {

  override function escape(str: String): String {
    return new CoffeeCompiler().compile(str)
  }

  override function escapeBody(str:String): String {
    return new CoffeeCompiler().compile(str)
  }
}