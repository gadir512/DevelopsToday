
interface Props {
  index: number;
  questionText: string;
  questionType: string;
}

export default function QuizQuestion({ index, questionText, questionType }: Props) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <li className="p-4 bg-gray-50 rounded shadow">
      <h3 className="text-xl font-semibold mb-2 text-black">Question {index + 1}:</h3>
      <p className="text-lg text-black">{questionText}</p>
      <p className="text-sm text-gray-600 italic">Type: {capitalize(questionType)}</p>
    </li>
  );
}
