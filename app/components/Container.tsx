import styles from '../styles/index.module.css'

interface IContainer {
  title?: string;
  children: React.ReactNode;
  isCommonBg?: boolean;
  opt?: React.ReactNode;
}

const Container = (props: IContainer) => {
  const { title, children, isCommonBg, opt } = props;
  return (
    <div className="w-full bg-[#F5F5F8]" style={{ minHeight: 'calc(100vh - 68px)' }}>
      {title && <div className="w-full relative h-[3.375rem] leading-[3.375rem] px-6 bg-white text-[#2C4E93] font-bold">{title}{opt}</div>}
      <div className={styles['container-content']} >
        <div style={isCommonBg ? {} : { background: '#fff' }}>{children}</div>
      </div>
    </div>
  );
}

export default Container;