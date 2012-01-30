package ronin_coffee

uses ronin.RoninTemplate

enhancement CoffeeEnhancement : RoninTemplate {

  public static property get CoffeeScript() : IReentrant {
    return CoffeeEscaper.Instance
  }

}
