package expo.modules.localmodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlin.system.exitProcess

class LocalModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("LocalModule")

    Function("hello") {
      runBlocking {
        appContext.mainQueue.launch {
          throw RuntimeException("App fatal error");
        }
      }
    }
  }
}
