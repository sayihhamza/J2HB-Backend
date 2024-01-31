import { readWorkbook, transformSheetData } from './series.helper';

describe('SeriesService', () => {
  it('should read and transform data from xlsx file', () => {
    // Arrange
    const seriesPath = "public/resources/series-test/series-test.xlsx";

    // Act
    const sheetData = readWorkbook(seriesPath);
    const result = transformSheetData(sheetData);

    const expectedOutput = [
      {
        "questions": [
          {
            "question": "هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:",
            "responses": [
              "نَعَمْ",
              "لاَ"
            ],
            "correction": [
              0
            ]
          },
          {
            "question": "نَتْجَاوَزْ:",
            "responses": [
              "نَعَمْ",
              "لاَ"
            ],
            "correction": [
              1
            ]
          }
        ],
        "image": "https://www.dropbox.com/scl/fi/0ja037rb12ct9zrk9bod1/1.png?rlkey=bfa2xbsm386gw8pc6c32pvc5r&dl=0",
        "audio": "https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav",
        "justification": "A"
      },
      {
        "questions": [
          {
            "question": "الْمَخَالَفَاتْ مَنْ الدَّرَجَة الثَّانِيَة كَتْسْتَوْجَبْ أدَاءْ غَرَامَة مَالِيَة دْيَالْ:",
            "responses": [
              "700 دَرْهَمْ",
              "500 دَرْهَمْ",
              "300 دَرْهَمْ"
            ],
            "correction": [
              1
            ]
          }
        ],
        "image": "https://www.dropbox.com/scl/fi/hcciyeycemphpedsqq84v/Screenshot-2024-01-29-at-18.52.22.png?rlkey=8pio49940zj7xfvn8f3d1x36h&dl=0",
        "audio": "https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav",
        "justification": "B"
      }
    ];

    // Assert
    expect(result).toEqual(expectedOutput);
  })
});