import styles from "../styles/index.module.css";

interface IContainer {
  title?: string;
  children: React.ReactNode;
  isCommonBg?: boolean;
}

const Container = (props: IContainer) => {
  const { title, children, isCommonBg } = props;
  return (
    <div className="w-full  mx-auto py-4 bg-[#eee]" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="w-content h-full  bg-white"> {children}</div>
    </div>
  );
}

export default Container;