export function openModal(
    modal: any,
    responseHandler: (...args: any[]) => void,
    extra?: any
) {
    dispatchEvent(
        new CustomEvent("requestModalOpen", {
            detail: { modal, responseHandler, extra }
        })
    );
}
