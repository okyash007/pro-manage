import toast from "react-hot-toast";

export function popToast(text) {
  toast.success(text, {
    style: { backgroundColor: "#F6FFF9", border: "2px solid #48C1B5" },
  });
}

export function popErrorToast(text) {
  toast.error(text, {
    style: { backgroundColor: "#fae3e3", border: "2px solid #CF3636" },
  });
}

export function popPromiseToast(promiseFunction, loading, error, success) {
  toast.promise(promiseFunction, {
    loading,
    error,
    success,
  });
}
