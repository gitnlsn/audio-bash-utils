import { execPromise } from "./execPromise";

interface RMSProps {
  filePath: string;
}

export const rms = async ({ filePath }: RMSProps) => {
  return await execPromise(`
    ffmpeg -i ${filePath} -filter:a volumedetect -f null /dev/null 2>&1 | 
        grep -Pio 'mean_volume: (-?)([0-9]+)\.([0-9]+)' | 
        cut -d ' ' -f 2
  `).then(({ stdout }) => {
    const stringValue = stdout.replace("\n", "");
    return Number(stringValue);
  });
};
