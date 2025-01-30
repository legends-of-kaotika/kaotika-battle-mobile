import socket from './socket';
import { SOCKET_EVENTS } from './events';
import PlayerInterface from '../interfaces/PlayerInterface';

export const listenToServerEventsBattleScreen = (setAllPlayers: (players: PlayerInterface[]) => void) => {
  socket.on(SOCKET_EVENTS.RECIVE_USERS, (players: PlayerInterface[]) => {
    console.log('Players: ' + players);
    setAllPlayers(players);
  });

};

export const listenToGameStart = (setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  socket.on(SOCKET_EVENTS.GAME_STARTED, (showWaitingScreen: boolean) => {
    showWaitingScreen = false;
    setShowWaitingScreen(false);
  });

};

export const clearListenToServerEventsBattleScreen = (): void => {
  socket.off(SOCKET_EVENTS.RECIVE_USERS);
  socket.off(SOCKET_EVENTS.GAME_STARTED);
}

export const listenToDesconnections = (setdisconnection: (disconnection: boolean) => void) => {
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log("desconnection modal on");
    setdisconnection(true);
  });
  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log("desconnection modal off");
    setdisconnection(false);
  });
}

