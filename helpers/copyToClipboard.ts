import toast from 'react-hot-toast';

export default function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
  toast.success("URL was copied to clipboard!");
}