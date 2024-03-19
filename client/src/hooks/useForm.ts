import { useState, useEffect, type ChangeEvent } from 'react';

interface InitialState<T> {
	form: T;
}

export const useForm = <T>({ form }: InitialState<T>) => {
	const [formState, setFormState] = useState(form);

	useEffect(() => {
		setFormState(form);
	}, [form]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormState((prevState) => ({ ...prevState, [name]: value }));
	};

  const handleReset = ()=>{
    setFormState(form)
  }

	return {
    ...formState,
    formState,
    handleChange,
    handleReset
  };
};
