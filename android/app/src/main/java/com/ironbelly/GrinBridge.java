package com.ironbelly;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GrinBridge extends ReactContextBaseJavaModule {

  static {
    System.loadLibrary("wallet");
  }

  @Override
  public String getName() {
    return "GrinBridge";
  }

  public GrinBridge(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void checkPassword(String state, String password, Promise promise) {
    try {
      promise.resolve(checkPassword(state, password));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void balance(String state, Boolean refreshFromNode, Promise promise) {
    try {
      promise.resolve(balance(state, refreshFromNode));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void seedNew(int seedLength, Promise promise) {
    try {
      promise.resolve(seedNew(seedLength));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void walletInit(String state, String phrase, String password, Promise promise) {
    try {
      promise.resolve(walletInit(state, phrase, password));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txGet(String state, Boolean refreshFromNode, String txSlateId, Promise promise) {
    try {
      promise.resolve(txGet(state, refreshFromNode, txSlateId));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txsGet(String state, Boolean refreshFromNode, Promise promise) {
    try {
      promise.resolve(txsGet(state, refreshFromNode));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void walletRecovery(String state, int startIndex, int limit, Promise promise) {
    try {
      promise.resolve(walletRecovery(state, startIndex, limit));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void walletPhrase(String state, Promise promise) {
    try {
      promise.resolve(walletPhrase(state));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txStrategies(String state, int amount, Promise promise) {
    try {
      promise.resolve(txStrategies(state, amount));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txCreate(
      String state,
      int amount,
      Boolean selectionStrategyIsUseAll,
      String message,
      Promise promise) {
    try {
      promise.resolve(txCreate(state, message, amount, selectionStrategyIsUseAll));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txCancel(String state, int id, Promise promise) {
    try {
      promise.resolve(txCancel(state, id));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txReceive(String state, String slatePath, String message, Promise promise) {
    try {
      promise.resolve(txReceive(state, slatePath, message));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txFinalize(String state, String slatePath, Promise promise) {
    try {
      promise.resolve(txFinalize(state, slatePath));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txSendHttps(
      String state,
      int amount,
      Boolean selectionStrategyIsUseAll,
      String message,
      String url,
      Promise promise) {
    try {
      promise.resolve(txSendHttps(state, amount, selectionStrategyIsUseAll, message, url));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void txPost(String state, String txSlateId, Promise promise) {
    try {
      promise.resolve(txPost(state, txSlateId));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  @ReactMethod
  public void walletRepair(String state, Promise promise) {
    try {
      promise.resolve(walletRepair(state));
    } catch (Exception e) {
      promise.reject("", e.getMessage());
    }
  }

  private static native String balance(String state, Boolean refreshFromNode);

  private static native String txGet(String state, Boolean refreshFromNode, String txSlateId);

  private static native String txsGet(String state, Boolean refreshFromNode);

  private static native String seedNew(int seedLength);

  private static native String walletInit(String state, String phrase, String password);

  private static native String checkPassword(String state, String password);

  private static native String walletRecovery(String state, int startIndex, int limit);

  private static native String txStrategies(String state, int amount);

  private static native String walletPhrase(String state);

  private static native String txCreate(
      String state, String message, int amount, Boolean selectionStrategyIsUseAll);

  private static native String txCancel(String state, int id);

  private static native String txReceive(String state, String slatePath, String message);

  private static native String txFinalize(String state, String slatePath);

  private static native String txSendHttps(
      String state, int amount, Boolean selectionStrategyIsUseAll, String message, String url);

  private static native String txPost(String state, String txSlateId);

  private static native String walletRepair(String state);
}
