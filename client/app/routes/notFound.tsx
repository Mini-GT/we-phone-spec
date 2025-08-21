import ErrorContent from "~/components/errorContent";
import type { NotFoundProps } from "~/types/globals.type";

export default function NotFound({
  message = "Page Not Found",
  details = "The page you are looking for does not exist.", 
}: NotFoundProps) {
  return (
    <ErrorContent 
      message={message} 
      details={details}
    />
  );
}