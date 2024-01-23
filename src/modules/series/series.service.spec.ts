import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let seriesService: SeriesService;

  beforeEach(() => {
    seriesService = new SeriesService();
  });

  it('should transform input data correctly', () => {
    // Given
    const inputData = [
      [
        {
          'Question 1': 'هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:',
          'Reponse 1': 'نَعَمْ',
          'Reponse 2': 'لاَ',
          'Question 2': 'نَتْجَاوَزْ:',
          'Reponse 2.1': 'نَعَمْ',
          'Reponse 2.2': 'لاَ',
          Correction: '1,4',
          __EMPTY: 15
        }
      ]
    ];

    // When
    const transformedData = seriesService['transformData'](inputData);

    // Then
    const expectedOutput =
      [
        {
          questions: [
            {
              question: "هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:",
              responses: [
                "نَعَمْ",
                "لاَ"
              ],
              correction: [
                0
              ]
            },
            {
              question: "نَتْجَاوَزْ:",
              responses: [
                "نَعَمْ",
                "لاَ"
              ],
              correction: [
                1
              ]
            }
          ]
        }
      ];

    expect(transformedData).toEqual(expectedOutput);
  });
});