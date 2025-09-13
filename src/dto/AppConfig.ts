import { toast } from "vue3-toastify";

export abstract class AppConfig {
  public static defaultToastSettings = {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_CENTER,
  };
}
