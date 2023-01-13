type ToggleButtonProps = {
  open: boolean;
  handleOpen: () => void;
};

export default function ToggleButton({ open, handleOpen }: ToggleButtonProps) {
  return (
    <div className='flex'>
      <label className='relative inline-flex cursor-pointer items-center'>
        <input type='checkbox' className='peer sr-only' checked={open} readOnly />
        <div
          onClick={handleOpen}
          className="peer h-6 w-11 rounded-full bg-gray-200  after:absolute  after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:duration-300 after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
        ></div>
      </label>
    </div>
  );
}
