import { useEffect, useState } from 'react'
import BattleScreen from './pages/BattleScreen.tsx'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'
import { potions } from './data/data.ts'
import PlayerInterface from './interfaces/PlayerInterface.tsx'
import DesconnectionModal from './components/DesconnectionModal.tsx'
import { listenToDesconnections } from './sockets/SocketListeners.tsx'


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [player, setPlayer] = useState<PlayerInterface | null>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(true);
  const [desconnection, setDesconnection] = useState<boolean>(true);

  useEffect(() => {
    listenToDesconnections(setDesconnection)
  }, []);

  return (
    <>
      {isLoggedIn ? <BattleScreen
        potions={potions}
        player={player}
        isMyTurn={isMyTurn}
        setIsMyTurn={setIsMyTurn} />
        : <LoginScreen
          email={email}
          setEmail={setEmail}
          setIsLoggedIn={setIsLoggedIn}
          setPlayer={setPlayer} />}
      {desconnection && <DesconnectionModal/>  }
      <PWABadge />
    </>
  )
}

export default App
