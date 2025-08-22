

const types = [
    "input","textarea"
]

const appInput = {
    new  : function(type, placeholder, value, id, classNames = [], action = null) {
        if (!types.includes(type)) {
            throw new Error(`Error: type ${type} of input is unknown.`)
        } else {
            let component;
            if (type == 'input') {
                component = (
                    <input 
                        id = {id || null}
                        placeholder= {placeholder || null}
                        defaultValue={value || null}
                        className = {
                            classNames.length > 0 ? (
                                classNames.map((e) => {
                                    return e
                                })
                            ) : null
                        }
                        onInput={
                          action
                        }
                    />
                )
            }

            else if (type == 'textarea') {
                component = (
                    <textarea 
                        id = {id || null}
                        placeholder= {placeholder || null}
                        defaultValue={value || null}
                        className = {
                            classNames.length > 0 ? (
                                classNames.map((e) => {
                                    return e
                                })
                            ) : null
                        }
                        onInput={
                          action
                        }
                        onKeyDown={(event) => {
                            if (action) {
                                if (classNames.includes('autosize')) {
                                    const previousValue = event.target.value;
                                    setTimeout(() => {
                                        const currentValue = event.target.value;
                                        if (event.key === "Enter" || (event.key === "Backspace" && previousValue !== currentValue)) {
                                            event.target.style.height = 'auto'; // Reset the height to auto
                                            event.target.style.height = (event.target.scrollHeight) + 'px'; // Set the new height
                                        }
                                    }, 0);
                                }

                                action(event);
                            }
                        }}
                    ></textarea>
                )
            }

            return component;

        }
    }
}

export default appInput;