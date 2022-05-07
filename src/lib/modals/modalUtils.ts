export function openModal(
    modal: any,
    responseHandler: (...args: any[]) => void
) {
    dispatchEvent(
        new CustomEvent("requestModalOpen", {
            detail: { modal, responseHandler }
        })
    );
}
