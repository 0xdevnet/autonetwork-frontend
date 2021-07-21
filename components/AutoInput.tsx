import { useState } from 'react';

type IProps = {
    name: string,
    placeHolder: string,
    setParentValue: (value: string) => void,
    inputType: string
}
const AutoInput = (props: IProps) => {
    const [value, setValue] = useState("");
    const {name, placeHolder, setParentValue, inputType} = props;
    const inputHandler = (event: any) => {
        setValue(event.target.value)
        setParentValue(event.target.value)
    }
    return (
        <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
            <input 
                name={name}
                value={value}
                placeholder={placeHolder}
                type={inputType}
                className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                onChange={(event) => inputHandler(event)}
                autoComplete="off"
            />
        </div>
    );
}

export default AutoInput;