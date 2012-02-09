package ronin_coffee

uses org.junit.runners.Suite.SuiteClasses
uses org.junit.runner.RunWith
uses org.junit.runners.Suite

@RunWith(Suite)
@SuiteClasses({ CoffeeFilterTest, CoffeeCompilerTest })
class CoffeeSuite {}