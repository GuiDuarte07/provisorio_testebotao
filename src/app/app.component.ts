import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface IPairPasswordNums {
  fisrtNum: number;
  secondNum: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'testeLogin';
  //A senha correta para o login
  correctPassword = '123456';
  //Os numeros sortidos para mostrar nos botões (2 numeros por indice)
  pairPasswordNums: IPairPasswordNums[] = [];
  //A senha inserida pelo usuário ao clicar nos botões
  passwordInsert: IPairPasswordNums[] = [];
  //Uma mascara só para por no input enquanto passwordInsert vai sendo preenchido
  passwordMask: string = '';

  ngOnInit(): void {
    this.generateButtons();
  }

  //recebe o valor do botao e adiciona em passwordInsert
  addToPassword(pair: IPairPasswordNums) {
    this.passwordInsert.push(pair);
    this.passwordMask += '*';
  }

  //funcionalidade do botao de apagar
  deletePassword() {
    this.passwordInsert.pop();
    this.passwordMask = this.passwordMask.slice(0, -1);
  }

  //verifica se a senha está correta
  isPasswordCorrect() {
    let isCorrect = true;

    for (let i = 0; i < 6; i++) {
      const pair = this.passwordInsert[i];
      const passNumPos = parseInt(this.correctPassword[i]);
      if (pair.fisrtNum !== passNumPos && pair.secondNum !== passNumPos) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      alert('Senha correta!');
    } else {
      alert('Senha incorreta!');
    }
  }

  //gera os botões com valores aleatórios sempre
  generateButtons() {
    const nums = this.randomizeNums();

    for (let i = 0; i < 5; i++) {
      const fisrtSortNum = nums.pop() as number;
      const secondSortNum = nums.pop() as number;
      this.pairPasswordNums[i] = {
        fisrtNum: fisrtSortNum,
        secondNum: secondSortNum,
      };
    }
  }

  //aleatoriza um array de numeros de 0 a 9, para facilitar a criação do pairPasswordNums
  private randomizeNums() {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  }
}
