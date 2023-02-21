import { app } from "@/lib/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterPage: NextPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    return <div>
        <form onSubmit={async e => {
            e.preventDefault()
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            await router.push('/')
        }}>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="submit" />
        </form>
    </div>
}

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async () => {
    const auth = getAuth(app);
    if (auth.currentUser) return {
        props: {},
        redirect: {
            destination: "/"
        }
    }
    return {
        props: {}
    }
}