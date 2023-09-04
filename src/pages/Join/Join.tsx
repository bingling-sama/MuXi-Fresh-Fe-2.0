import './Join.less';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const navigate = useNavigate();

  return (
    <div className="join-wrap">
      <div className="logo-box">
        <img src={'https://muxi-fresh.muxixyz.com/fe-static/muxistudio.png'} alt="#" />
      </div>
      <div className="join-btn-box">
        <span className="join-btn" onClick={() => window.open('https://muxi-tech.xyz/')}>
          进入官网
        </span>
        <span className="join-btn" onClick={() => navigate('/app')}>
          加入我们
        </span>
        <span
          className="join-btn"
          onClick={() => window.open('https://muxi-studio.github.io/101/')}
        >
          木犀101
        </span>
      </div>
    </div>
  );
}
