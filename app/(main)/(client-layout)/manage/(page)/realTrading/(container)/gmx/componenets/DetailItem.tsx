interface IDetailItem {
  label: string;
  value?: string | number;
  width?: string;
}

const DetailItem = (props: IDetailItem) => {
  const { label, value, width } = props;
  return <div className="flex w-[25%] pb-4" style={width ? { width } : {}}>
    <div className="pr-2 text-[#666]">{label}</div>
    <div className="text-[#1a1a1a] font-semibold">{value}</div>
  </div>
}

export default DetailItem