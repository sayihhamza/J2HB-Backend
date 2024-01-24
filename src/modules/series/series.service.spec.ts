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
    const transformedData = seriesService['transformSheetData'](inputData);

    // Then
    const expectedOutput =
      [
        {
          "questions": [
            {
              "question": "هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:",
              "correction": [
                0
              ],
              "responses": [
                "نَعَمْ",
                "لاَ"
              ]
            },
            {
              "question": "نَتْجَاوَزْ:",
              "correction": [
                1
              ],
              "responses": [
                "نَعَمْ",
                "لاَ"
              ]
            }
          ]
        }
      ];

    expect(transformedData).toEqual(expectedOutput);
  });
});