const cancel = (setState,tp = false,name="Annuler") => {
    return {
        text: name,
        onClick: () => {
            setState(tp);
            document.body.style.overflow = 'auto';
        },
        className: "secondary",
        style: {},
        escape: true
    }
}

export default cancel;