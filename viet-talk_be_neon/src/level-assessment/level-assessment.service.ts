import { Injectable } from '@nestjs/common';

@Injectable()
export class LevelAssessmentService {
  private audioSpeed = 1.1;

  getOverview() {
    return {
      completedTests: 3,
      averageScore: 83,
      audioSpeed: this.audioSpeed,
      progress: {
        overall: 68,
        listening: 85,
        vocabulary: 61,
      },
      items: [
        {
          id: 'item-01',
          title: '経済トピック — 北部ベトナム語音読判定テスト',
          category: 'VMS',
          progress: 10,
          status: 'inProgress',
          buttonLabel: '学習を開始',
          buttonColor: 'bg-[#dc2626] hover:bg-[#b91c1c]',
        },
        {
          id: 'item-02',
          title: '辞書 — ユニット２確認テスト',
          category: 'VMS',
          progress: 75,
          status: 'completed',
          buttonLabel: '復習する',
          buttonColor: 'bg-[#16a34a] hover:bg-[#15803d]',
        },
        {
          id: 'item-03',
          title: '食事のマナー — 北部ベトナム語音読判定テスト',
          category: 'YMS',
          progress: 85,
          status: 'completed',
          buttonLabel: '復習する',
          buttonColor: 'bg-[#16a34a] hover:bg-[#15803d]',
        },
        {
          id: 'item-04',
          title: 'ビジネスのあいさつ — 模擬会話',
          category: 'VMS',
          progress: 42,
          status: 'inProgress',
          buttonLabel: '学習を開始',
          buttonColor: 'bg-[#dc2626] hover:bg-[#b91c1c]',
        },
        {
          id: 'item-05',
          title: 'テトの伝統 — 1.2k 受信者数',
          category: 'VMS',
          progress: 28,
          status: 'needsReview',
          buttonLabel: 'テストを開始',
          buttonColor: 'bg-[#dc2626] hover:bg-[#b91c1c]',
        },
        {
          id: 'item-06',
          title: 'テトの伝統 — 1.2k 受信者数',
          category: 'VMS',
          progress: 98,
          status: 'completed',
          buttonLabel: 'テストを開始',
          buttonColor: 'bg-[#16a34a] hover:bg-[#15803d]',
        },
      ],
    };
  }

  updateAudioSpeed(speed: number) {
    this.audioSpeed = Number(speed.toFixed(1));
    return { audioSpeed: this.audioSpeed };
  }
}
