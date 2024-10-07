"use client";

import { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { format } from "date-fns";
import SelectUbication from './SelectUbication';
import { useRouter } from 'next/navigation';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const router = useRouter();

    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [sexo, setSexo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [tipoVivienda, setTipoVivienda] = useState('');
    const [observacion, setObservacion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [ubication, setUbication] = useState({
        country: '',
        state: '',
        city: '',
        countryName: '',
        stateName: '',
        cityName: ''
    });

    const calculateAge = (birthDate: Date): number => {
        const today = new Date();
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate();

        let age = today.getFullYear() - birthYear;
        const monthDifference = today.getMonth() - birthMonth;

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDay)) {
            age--;
        }

        return age;
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !nombre || !apellido || !sexo || !birthDate || !direccion || !tipoVivienda || !ubication.country || !ubication.state || !ubication.city) {
            setErrorMessage('Por favor, completa todos los campos antes de enviar el formulario.');
            return;
        }

        const age = calculateAge(birthDate);
        if (age < 18) {
            setErrorMessage('Debes tener al menos 18 años para registrarte.');
            return;
        }

        setErrorMessage('');

        const data = {
            email,
            nombre,
            apellido,
            sexo,
            fecha_nacimiento: birthDate,
            direccion,
            vivienda: tipoVivienda,
            id_country: ubication.country,
            id_state: ubication.state,
            id_city: ubication.city,
            pais: ubication.countryName,
            estado: ubication.stateName,
            ciudad: ubication.cityName,
            observacion,
        };

        try {
            const response = await fetch('/api/items/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Usuario creado:', result);
                alert('Usuario creado exitosamente');
            } else if (response.status === 400) {
                const result = await response.json();
                setErrorMessage(result.error);
            } else {
                console.error('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const goToAdminForm = () => {
        router.push('/admin');
    };


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className="md:flex">
                    <div className={styles.leftSection}>
                        <h1 className="text-3xl font-extrabold mb-6">Formulario de Contacto</h1>
                        <p className="text-purple-100 mb-4">Nos encantaría saber más sobre ti. Por favor, completa el formulario y nos pondremos en contacto contigo pronto.</p>
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Contacto y Redes Sociales</h2>
                            <div className="flex items-center mb-3">
                                <Mail className="mr-2" size={20} />
                                <span>contacto@ejemplo.com</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <Phone className="mr-2" size={20} />
                                <span>+1 234 567 8900</span>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="text-white hover:text-purple-200 transition-colors">
                                    <Facebook size={24} />
                                </a>
                                <a href="#" className="text-white hover:text-purple-200 transition-colors">
                                    <Instagram size={24} />
                                </a>
                                <a href="#" className="text-white hover:text-purple-200 transition-colors">
                                    <Twitter size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Select de Sexo */}
                                <div>
                                    <Label htmlFor="sexo" className="text-sm font-medium text-gray-700">Sexo</Label>
                                    <Select onValueChange={(value) => setSexo(value)} value={sexo}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Seleccione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Masculino">Masculino</SelectItem>
                                            <SelectItem value="Femenino">Femenino</SelectItem>
                                            <SelectItem value="Otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="fechaNacimiento" className="text-sm font-medium text-gray-700">Fecha de Nacimiento</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                                                {birthDate ? format(birthDate, "PPP") : <span>Seleccione una fecha</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={birthDate}
                                                onSelect={setBirthDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                    <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</Label>
                                    <Input id="nombre" placeholder="Ingrese su nombre" className="mt-1" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="apellido" className="text-sm font-medium text-gray-700">Apellido</Label>
                                    <Input id="apellido" placeholder="Ingrese su apellido" className="mt-1" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                    <Input id="email" type="email" placeholder="Ingrese su email" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="direccion" className="text-sm font-medium text-gray-700">Dirección</Label>
                                    <Input id="direccion" placeholder="Ingrese su dirección" className="mt-1" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                                </div>

                                <div>
                                    <SelectUbication onUbicationChange={setUbication} />
                                </div>
                                <div>
                                    <Label htmlFor="tipoVivienda" className="text-sm font-medium text-gray-700">Casa/Apartamento</Label>
                                    <Select onValueChange={(value) => setTipoVivienda(value)} value={tipoVivienda}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Seleccione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Casa">Casa</SelectItem>
                                            <SelectItem value="Apartamento">Apartamento</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>

                            <div>
                                <Label htmlFor="observacion" className="text-sm font-medium text-gray-700">Observación</Label>
                                <Textarea id="observacion" placeholder="Ingrese su observación" className="mt-1" value={observacion} onChange={(e) => setObservacion(e.target.value)} />
                            </div>

                            {errorMessage && <p className="text-sm font-medium text-red-500">{errorMessage}</p>}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Button type="submit" className={styles.submitButton}>
                                    Enviar
                                </Button>

                                <Button type="button" onClick={goToAdminForm} className={styles.submitButton}>
                                    Panel de administración
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
