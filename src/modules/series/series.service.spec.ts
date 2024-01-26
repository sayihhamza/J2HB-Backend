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
        questions: [
          {
            question: 'هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:',
            responses: ['نَعَمْ', 'لاَ'],
            correction: [0],
          },
          {
            question: 'نَتْجَاوَزْ:',
            responses: ['نَعَمْ', 'لاَ'],
            correction: [1],
          },
        ],
      },
      {
        questions: [
          {
            question: 'الْمَخَالَفَاتْ مَنْ الدَّرَجَة الثَّانِيَة كَتْسْتَوْجَبْ أدَاءْ غَرَامَة مَالِيَة دْيَالْ:',
            responses: ['700 دَرْهَمْ', '500 دَرْهَمْ', '300 دَرْهَمْ'],
            correction: [1],
          },
        ],
      },
    ];

    // Assert
    expect(result).toEqual(expectedOutput);
  })
});