import ProfileComponent from "@/src/components/profile/ProfileComponent";
import Heading from "@/src/components/ui/Heading";

export default function ProfilePage() {
  return (
    <>
      <Heading>
        Mi perfil
      </Heading>

      <section className="flex justify-center">
        <ProfileComponent />
      </section>
    </>
  )
}
