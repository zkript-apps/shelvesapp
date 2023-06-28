"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { T_APP_UPDATE } from "@/types/global";
import { useRouter } from 'next/navigation';
import useUpdateApp from "@/hooks/useUpdateApp";
import useGetApp from "@/hooks/useGetApp";
import TableSkeleton from "./TableSkeleton";
import Switch from "./Switch";
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from "@/store/useAuthStore";
import copyToClipboard from "@/helpers/copyToClipboard";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const AppEdit = ({ appId }: { appId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: app, isLoading: isAppLoading } = useGetApp(appId);
  const { register, handleSubmit, formState: { errors }, setValue, watch, getValues } = useForm<T_APP_UPDATE>({ values: app });
  const { mutate, isLoading } = useUpdateApp();
  const role = useAuthStore((state) => state.role);
  const onSubmit = (data: T_APP_UPDATE) => {
    const defaultValues = {
      id: data.id,
      name: data.name,
      redirectLink: data.redirectLink,
      playStoreUrl: data.playStoreUrl,
      enabled: data.enabled,
      status: data.status
    };
    const callbackReq = {
      onSuccess: (data: string | object) => {
        if (typeof data === "object") {
          queryClient.invalidateQueries({ queryKey: ['app', appId] });
          queryClient.invalidateQueries({ queryKey: ['apps'] });
          toast.success("Success updating app");
          router.push("/home");
        } else {
          toast.error(data);
        }
      },
      onError: (err: any) => {
        toast.error(err);
      },
    }
    mutate(defaultValues, callbackReq)
  };
  if (Object.keys(errors).length > 0) {
    toast.error('Please complete all fields');
  }
  const enabled: boolean = watch("enabled");
  const approved: boolean = watch("status") === 'ACTIVE';
  const redirectUrl = watch("redirectLink");
  const playStoreUrl = getValues("playStoreUrl");
  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900">Update App</h2>
        </div>
        {!isAppLoading ? (
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
            <div className="mt-4 group transition">
              <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-600">
                Redirect Link
                <DocumentDuplicateIcon
                  className="ml-1.5 h-5 w-5 flex-shrink-0 text-gray-400 invisible group-hover:visible hover:text-gray-600 transition cursor-pointer"
                  aria-hidden="true"
                  onClick={(e) => copyToClipboard(redirectUrl)}
                />
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("redirectLink", { required: true })}
                  id="redirectLink"
                  disabled={isLoading}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-progress"
                />
              </div>
            </div>
            <div className="mt-4 group transition">
              <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-600">
                <span>Play Store URL</span>
                <DocumentDuplicateIcon
                  className="ml-1.5 h-5 w-5 flex-shrink-0 text-gray-400 invisible group-hover:visible hover:text-gray-600 transition cursor-pointer"
                  aria-hidden="true"
                  onClick={(e) => copyToClipboard(playStoreUrl)}
                />
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("playStoreUrl", { required: true })}
                  id="playStoreUrl"
                  disabled={isLoading || role === "ASSISTANT"}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 ${role !== "ASSISTANT" && "disabled:cursor-progress"}`}
                />
              </div>
              <div className="mt-4 flex flex-col lg:flex-row gap-6">
                <div className="flex-none">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                    Enabled
                  </label>
                  <div className="mt-2">
                    <Switch enabled={enabled ? enabled : false} setEnabled={() => setValue("enabled", !enabled)} />
                  </div>
                </div>
                {role !== "ASSISTANT" && (
                  <div className="flex-none">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                      Approved
                    </label>
                    <div className="mt-2">
                      <Switch enabled={approved ? approved : false} setEnabled={() => setValue("status", approved ? "PENDING" : "ACTIVE")} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link href="/home" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-progress"
              >
                Update
              </button>
            </div>
          </form>
        ) : <TableSkeleton />}
      </div>
    </main>
  )
}

export default AppEdit