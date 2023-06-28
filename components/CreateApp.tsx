"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { T_APP } from "@/types/global";
import { useRouter } from 'next/navigation';
import useCreateApp from "@/hooks/useCreateApp";
import useAuthStore from "@/store/useAuthStore";

const CreateItem = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<T_APP>();
    const { mutate, isLoading } = useCreateApp();
    const role = useAuthStore((state) => state.role);
    const onSubmit = (data: T_APP) => {
        const callbackReq = {
            onSuccess: (data: string | object) => {
                if (typeof data === "object") {
                    toast.success("Success adding app");
                    router.push("/home");
                } else {
                    toast.error(data);
                }
            },
            onError: (err: any) => {
                toast.error(err);
            },
        }
        mutate(data, callbackReq)
    };
    if (Object.keys(errors).length > 0) {
        toast.error('Please complete all fields');
    }
    if(role === "ASSISTANT") {
        toast.error("You are not allowed to add an app");
    } 
    return (
        <main className="pb-16 pt-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h2 className="text-lg font-medium text-gray-900">Create App</h2>
                </div>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                id="name"
                                disabled={isLoading || role === "ASSISTANT"}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-progress"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                            Redirect Link
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("redirectLink", { required: true })}
                                id="redirectLink"
                                disabled={isLoading || role === "ASSISTANT"}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-progress"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                            Play Store URL
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("playStoreUrl", { required: true })}
                                id="playStoreUrl"
                                disabled={isLoading || role === "ASSISTANT"}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-progress"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link href="/home" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading || role === "ASSISTANT"}
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-progress"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateItem