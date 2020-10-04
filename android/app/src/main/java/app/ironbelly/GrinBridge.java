package app.ironbelly;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;
import android.os.AsyncTask;

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
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(checkPassword(state, password));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void balance(String state, Boolean refreshFromNode, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(balance(state, refreshFromNode));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void setLogger(Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(setLogger());
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void seedNew(double seedLength, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(seedNew((long) seedLength));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void walletInit(String state, String phrase, String password, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(walletInit(state, phrase, password));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txGet(String state, Boolean refreshFromNode, String txSlateId, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txGet(state, refreshFromNode, txSlateId));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txsGet(String state, Boolean refreshFromNode, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txsGet(state, refreshFromNode));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void walletPmmrRange(String state, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(walletPmmrRange(state));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void walletScanOutputs(String state, double lastRetrievedIndex, double highestIndex, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(walletScanOutputs(state, (long) lastRetrievedIndex, (long) highestIndex));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void walletPhrase(String state, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(walletPhrase(state));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txStrategies(String state, double amount, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txStrategies(state, (long) amount));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txCreate(
      String state,
      double amount,
      Boolean selectionStrategyIsUseAll,
      Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txCreate(state, (long) amount, selectionStrategyIsUseAll));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txCancel(String state, double id, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txCancel(state, (long) id));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txReceive(String state, String slatepack, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txReceive(state, slatepack ));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txFinalize(String state, String slatepack, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txFinalize(state, slatepack));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txSendHttps(
      String state,
      double amount,
      Boolean selectionStrategyIsUseAll,
      String url,
      Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txSendHttps(state, (long) amount, selectionStrategyIsUseAll, url));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  @ReactMethod
  public void txPost(String state, String txSlateId, Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          promise.resolve(txPost(state, txSlateId));
        } catch (Exception e) {
          promise.reject("", e.getMessage());
        }
      }
    });
  }

  private static native String setLogger();

  private static native String balance(String state, boolean refreshFromNode);

  private static native String txGet(String state, boolean refreshFromNode, String txSlateId);

  private static native String txsGet(String state, boolean refreshFromNode);

  private static native String seedNew(long seedLength);

  private static native String walletInit(String state, String phrase, String password);

  private static native String checkPassword(String state, String password);

  private static native String walletScanOutputs(String state, long lastRetrievedIndex, long highestIndex);

  private static native String walletPmmrRange(String state);

  private static native String txStrategies(String state, long amount);

  private static native String walletPhrase(String state);

  private static native String txCreate(
      String state, long amount, boolean selectionStrategyIsUseAll);

  private static native String txCancel(String state, long id);

  private static native String txReceive(String state, String slatepack);

  private static native String txFinalize(String state, String slatepack);

  private static native String txSendHttps(
      String state, long amount, boolean selectionStrategyIsUseAll, String url);

  private static native String txPost(String state, String txSlateId);
}
