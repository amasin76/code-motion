function Divider() {
  return (
    <span className="relative flex justify-center">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-75"></div>
    </span>
  );
}

export default Divider;
