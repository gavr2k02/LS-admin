import Loader from '../../components/loader';
import style from './style.module.scss';

interface ILoadingProps {
  minScrin?: boolean;
}

export default function Loading({ minScrin = false }: ILoadingProps) {
  return (
    <div class={style.loading} style={minScrin && { height: '80vh', width: '80%' }}>
      <Loader />
    </div>
  );
}
