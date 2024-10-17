import { useRouter } from 'next/navigation';
import styles from '../styles/index.module.css'
import { ArrowLeftOutlined } from '@ant-design/icons';

interface IContainer {
  title?: string;
  children: React.ReactNode;
  isCommonBg?: boolean;
  loading?: boolean;
  isBack?: boolean;
  opt?: React.ReactNode;
  style?: React.CSSProperties;
}

const Container = (props: IContainer) => {
  const { title, children, isCommonBg, loading, isBack, opt, style } = props;
  const router = useRouter();

  const onBack = () => {
    const location = window.location.pathname;
    const newPath = location.split('/').slice(0, -1).join('/');
    router.push(newPath);
  }
  return (
    <div className="w-full bg-[#F5F5F8]" style={{ minHeight: 'calc(100vh - 68px)' }}>
      {title && <div className="w-full relative h-[3.375rem] leading-[3.375rem] px-6 bg-white text-[#2C4E93] font-bold">
        {isBack && <ArrowLeftOutlined className='mr-2 cursor-pointer' onClick={onBack} />}
        <span>{title}</span>
        {opt}
      </div>}
      <div className={styles['container-content']} >
        <div style={isCommonBg ? {} : { background: '#fff' }}>{children}</div>
      </div>
    </div>
  );
}

export default Container;