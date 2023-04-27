import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import ReactDOM from "react-dom";
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { PostContentApi } from '../services/Api'
import { useToast } from '../hooks/useToast';
import { UserAtom } from '../states/userAtom';
import { useRecoilState } from 'recoil';

function AddContent(props) {
    const { showToast, hideToast, ToastWrapper } = useToast();
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            test: props?.content
        }
    });
    const {
        fields,
        append, remove,

    } = useFieldArray({
        control,
        name: "test"
    });

    const onSubmit = async (data) => {

        try {
            const response = await PostContentApi(data?.test, props?.organisationDetail?._id, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
            props?.setContentData(data?.test);
            showToast("Directory created Successful", "success");
            props?.setIsOpenAddDirector(false)


        }
        catch (error) {
            console.log(error)
            showToast("Request Failed pls tryrd again");
            setTimeout(hideToast, 3000);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-2 justify-center flex flex-col justify-items-center items-center  overflow-scroll">
                <ul className="gap-[10px] flex flex-col">
                    {fields.map((item, index) => {
                        return (
                            <li key={item.id} className="flex gap-[10px] ">
                                <input
                                    className="rounded-lg !border-[1px] !border-black border-solid p-1 h-[50px]"
                                    placeholder="Directory Name"
                                    {...register(`test.${index}.name`, { required: true })}
                                />

                                <Controller
                                    render={({ field }) => <textarea
                                        placeholder="Directory content"

                                        className="rounded-lg !border-[1px] border-black p-1 h-[100px]"

                                        {...field} />}
                                    name={`test.${index}.description`}
                                    control={control}
                                />
                                <button type="button" onClick={() => remove(index)}>
                                    <AiOutlineDelete size="30px" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <section className="flex gap-[10px]">
                    <button
                        className='w-full items-center  md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150 flex gap-[10px]'

                        type="button"
                        onClick={() => {
                            append({ name: "", description: "" });
                        }}
                    >
                        <AiOutlineFolderAdd size="30px" />       Append
                    </button>

                    <button
                        className='w-full items-center  md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150 flex gap-[10px]'

                        type="submit"

                    >
                        Submit
                    </button>

                </section>

            </form>
            <ToastWrapper />

        </div>

    )
}

export default AddContent