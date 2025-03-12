import { NativeModule, requireOptionalNativeModule } from "expo";

declare class LocalModule extends NativeModule {
  hello(): string;
}

export default requireOptionalNativeModule<LocalModule>("LocalModule");
