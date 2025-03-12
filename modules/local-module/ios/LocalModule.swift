import ExpoModulesCore

public class LocalModule: Module {
  public func definition() -> ModuleDefinition {
    Name("LocalModule")
    
    Function("hello") {
      fatalError("App fatal error")
    }
  }
}
