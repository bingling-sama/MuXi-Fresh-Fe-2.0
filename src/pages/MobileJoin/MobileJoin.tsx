import './MobileJoin.less';
import { useNavigate } from 'react-router-dom';

export default function MobileJoin() {
  const navigate = useNavigate();

  return (
    <div className="mobile-join-wrap">
      <div className="header-box">
        <div className="muxi-box" onClick={() => window.open('https://m.muxi-tech.xyz/')}>
          木犀官网
        </div>
        <div className="muxi-logo-box">
          <img src={'https://muxi-fresh.muxixyz.com/fe-static/muxistudio.png'} alt="" />
        </div>
        <div
          className="muxi101-box"
          onClick={() => window.open('https://muxi-studio.github.io/101/')}
        >
          木犀101
        </div>
      </div>
      <div className="join-pic-box">
        <img src={'https://muxi-fresh.muxixyz.com/fe-static/join.png'} alt="" />
      </div>
      <div className="join-btn-box">
        <span className="join-btn" onClick={() => navigate('/login')}>
          加入我们
        </span>
      </div>
    </div>
  );
}
