import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-started',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './started.component.html',
  styleUrls: ['./started.component.scss']
})
export class StartedComponent implements OnInit {
  constructor(private navigateService: NavigateService) {}
  questionsAndAnswers = [
    { question: "What is your name?", answer: "My name is John." },
    { question: "Where are you from?", answer: "I am from New York." },
    { question: "What is your favorite color?", answer: "My favorite color is blue." },
    { question: "How do you spend your weekends?", answer: "I usually go hiking or read books." },
    { question: "Do you have any pets?", answer: "Yes, I have a dog named Max." },
    // Thêm các cặp câu hỏi và câu trả lời khác vào đây
  ];

  currentQuestionIndex = 0;

  ngOnInit() {
    // Gọi hàm để hiển thị ngẫu nhiên lúc ban đầu
    this.displayQuestionAndAnswer();

    // Tự động cập nhật sau mỗi 5 giây (hoặc bạn có thể chọn khoảng thời gian khác)
    setInterval(() => {
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questionsAndAnswers.length;
      this.displayQuestionAndAnswer();
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  getRandomQuestionAndAnswer() {
    return this.questionsAndAnswers[this.currentQuestionIndex];
  }

  displayQuestionAndAnswer() {
    const { question, answer } = this.getRandomQuestionAndAnswer();
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");

    if (questionElement && answerElement) {
      questionElement.textContent = question;
      answerElement.textContent = answer;
    }
  }

  navigateToSignUp() {
    // Chuyển hướng đến trang đăng ký
    this.navigateService.navigate('/register');
  }

  navigateToLogIn() {
    // Chuyển hướng đến trang đăng ký
    this.navigateService.navigate('/login');
  }
}



