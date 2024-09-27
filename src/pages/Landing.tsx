import '../index.css'

import { Title } from '../components/Title';
import { Subtitle } from '../components/Subtitle';
import { PasswordAuth } from '../components/PasswordAuth';
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate()
  const onSuccess = () => {
    navigate("34kZKvcMIgUH")
  }

  return (
    <div className="App">
      <div className="h-screen bg-cover flex flex-col items-center justify-center px-5 overflow-hidden">
        <Title className="title-hover"/>
        <Subtitle text='INVITE ONLY' className="mt-1 mb-32" />
        <PasswordAuth onSuccess={onSuccess} />
      </div>
    </div>
  );
}

export default Landing
