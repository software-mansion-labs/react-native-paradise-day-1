import { Ionicons } from "@expo/vector-icons";

export function HomeIcon(props: { size: number; color: string }) {
  return <Ionicons name="home" size={props.size} color={props.color} />;
}

export function ServicesIcon(props: { size: number; color: string }) {
  return <Ionicons name="apps-outline" size={props.size} color={props.color} />;
}

export function ActivityIcon(props: { size: number; color: string }) {
  return (
    <Ionicons name="receipt-outline" size={props.size} color={props.color} />
  );
}

export function AccountIcon(props: { size: number; color: string }) {
  return <Ionicons name="person" size={props.size} color={props.color} />;
}
