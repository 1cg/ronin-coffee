package ronin_coffee

uses ronin.RoninTemplateObserver

class CoffeeEscaper implements gw.lang.parser.template.IEscapesAllContent, IReentrant {

  static var _instance : CoffeeEscaper as Instance = new CoffeeEscaper()

  override function escape(str: String): String {
    return new CoffeeCompiler().compile(str)
  }

  override function escapeBody(str:String): String {
    return new CoffeeCompiler().compile(str)
  }

  override function enter() {
    RoninTemplateObserver.pushRoninEscaper(this)
  }

  override function exit() {
    RoninTemplateObserver.popRoninEscaper()
  }

}