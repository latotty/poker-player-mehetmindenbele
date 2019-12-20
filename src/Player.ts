export class Player {
  public betRequest(gameState: any, betCallback: (bet: number) => void): void {
    betCallback(0);
  }

  public showdown(gameState: any): void {
    console.log('showdown');
  }
}

export default Player;
