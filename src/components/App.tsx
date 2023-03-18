import React from 'react';
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface AppState{
  user : User | undefined
}

export class App extends React.Component<{}, AppState>{


  private auth : AuthService = new AuthService();

  render(): React.ReactNode {
    return (
      <div>abdalla sleman test</div>
    );
  }
}

