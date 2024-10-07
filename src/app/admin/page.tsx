"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Edit, Trash, ArrowLeft } from "lucide-react";
import { format, parseISO } from "date-fns";
import SelectUbication from '../../components/SelectUbication';
import Link from 'next/link';
import jsPDF from "jspdf";


type Record = {
  email: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  sexo: string;
  direccion: string;
  vivienda: string;
  pais: string;
  estado: string;
  ciudad: string;
  observacion: string;
};

export default function AdminView() {
  const [records, setRecords] = useState<Record[]>([]);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/items/contact');
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        } else {
          console.error('Error fetching records');
        }
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
  };

  const handleDelete = async (email: string) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/items/contact?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecords(records.filter(record => record.email !== email));
      } else {
        console.error('Error deleting record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };


  const handleSave = async (updatedRecord: Record) => {

    const isConfirmed = window.confirm("¿Estás seguro de que deseas guardar los cambios?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch('/api/items/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setRecords(records.map(record =>
          record.email === updatedUser.email ? updatedUser : record
        ));
        setEditingRecord(null);

        alert('Los cambios se guardaron con éxito.');
      } else {
        console.error('Error updating record');
        alert('Hubo un error al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Error de red al guardar los cambios.');
    }
  };


  const downloadPDF = (record: Record) => {
    const doc = new jsPDF();
    const marginLeft = 20;
    const marginRight = 180;
    let yOffset = 20;
    const lineHeight = 10;

    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41);
    doc.text("Registro de Contacto", marginLeft, yOffset, { align: "left" });
    yOffset += 10;

    doc.setLineWidth(0.5);
    doc.setDrawColor(139, 92, 246);
    doc.line(marginLeft, yOffset, marginRight, yOffset);
    yOffset += 15;

    doc.setFontSize(16);
    doc.setTextColor(139, 92, 246);
    doc.text("Información Personal", marginLeft, yOffset);
    yOffset += lineHeight;

    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);

    const personalInfo = [
      { label: "Nombre", value: record.nombre },
      { label: "Apellido", value: record.apellido },
      { label: "Sexo", value: record.sexo },
      { label: "Fecha de Nacimiento", value: record.fecha_nacimiento ? format(parseISO(record.fecha_nacimiento), "PPP") : '' },
      { label: "Email", value: record.email },
    ];

    personalInfo.forEach((info) => {
      doc.text(`${info.label}:`, marginLeft, yOffset);
      doc.text(info.value, marginLeft + 60, yOffset);
      yOffset += lineHeight;
    });

    doc.setLineWidth(0.3);
    doc.setDrawColor(100);
    doc.line(marginLeft, yOffset, marginRight, yOffset);
    yOffset += 15;

    doc.setFontSize(16);
    doc.setTextColor(139, 92, 246);
    doc.text("Dirección", marginLeft, yOffset);
    yOffset += lineHeight;

    const addressInfo = [
      { label: "Dirección", value: record.direccion },
      { label: "Tipo de Vivienda", value: record.vivienda },
      { label: "País", value: record.pais },
      { label: "Departamento", value: record.estado },
      { label: "Ciudad", value: record.ciudad },
    ];

    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);

    addressInfo.forEach((info) => {
      doc.text(`${info.label}:`, marginLeft, yOffset);
      doc.text(info.value, marginLeft + 60, yOffset);
      yOffset += lineHeight;
    });

    doc.setLineWidth(0.3);
    doc.setDrawColor(100);
    doc.line(marginLeft, yOffset, marginRight, yOffset);
    yOffset += 15;

    doc.setFontSize(16);
    doc.setTextColor(139, 92, 246);
    doc.text("Observaciones", marginLeft, yOffset);
    yOffset += lineHeight;

    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    doc.text(record.observacion || "Ninguna", marginLeft, yOffset);
    yOffset += 20;

    doc.setLineWidth(0.3);
    doc.setDrawColor(100);
    doc.line(marginLeft, yOffset, marginRight, yOffset);
    yOffset += 10;

    doc.save(`registro_${record.nombre}_${record.apellido}.pdf`);
  };

  const downloadTotalPDF = () => {
    const doc = new jsPDF();
    let yOffset = 20;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;
    const marginLeft = 20;
    const marginRight = 180;

    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41);
    doc.text("Registros de Contacto", marginLeft, yOffset, { align: "left" });
    yOffset += 10;

    doc.setLineWidth(0.5);
    doc.setDrawColor(139, 92, 246);
    doc.line(marginLeft, yOffset, marginRight, yOffset);
    yOffset += 15;

    records.forEach((record, index) => {
      doc.setFontSize(16);
      doc.setTextColor(33, 37, 41);
      doc.text(`Usuario ${index + 1}`, marginLeft, yOffset);
      yOffset += lineHeight;

      if (yOffset + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setLineWidth(0.3);
      doc.setDrawColor(100);
      doc.line(marginLeft, yOffset, marginRight, yOffset);
      yOffset += 10;

      const personalInfo = [
        { label: "Nombre", value: record.nombre },
        { label: "Apellido", value: record.apellido },
        { label: "Sexo", value: record.sexo },
        { label: "Fecha de Nacimiento", value: record.fecha_nacimiento ? format(parseISO(record.fecha_nacimiento), "PPP") : '' },
        { label: "Email", value: record.email },
      ];

      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);

      personalInfo.forEach((info) => {
        doc.text(`${info.label}:`, marginLeft, yOffset);
        doc.text(info.value, marginLeft + 60, yOffset);
        yOffset += lineHeight;

        if (yOffset + lineHeight > pageHeight - marginBottom) {
          doc.addPage();
          yOffset = 20;
        }
      });

      doc.setFontSize(16);
      doc.setTextColor(33, 37, 41);
      doc.text("Dirección", marginLeft, yOffset);
      yOffset += lineHeight;

      const addressInfo = [
        { label: "Dirección", value: record.direccion },
        { label: "Tipo de Vivienda", value: record.vivienda },
        { label: "País", value: record.pais },
        { label: "Departamento", value: record.estado },
        { label: "Ciudad", value: record.ciudad },
      ];

      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);

      addressInfo.forEach((info) => {
        doc.text(`${info.label}:`, marginLeft, yOffset);
        doc.text(info.value, marginLeft + 60, yOffset);
        yOffset += lineHeight;

        if (yOffset + lineHeight > pageHeight - marginBottom) {
          doc.addPage();
          yOffset = 20;
        }
      });

      doc.setFontSize(16);
      doc.setTextColor(33, 37, 41);
      doc.text("Observaciones", marginLeft, yOffset);
      yOffset += lineHeight;

      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text(record.observacion || "Ninguna", marginLeft, yOffset);
      yOffset += 20;

      doc.setLineWidth(0.3);
      doc.setDrawColor(100);
      doc.line(marginLeft, yOffset, marginRight, yOffset);
      yOffset += 15;

      if (yOffset + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        yOffset = 20;
      }
    });

    doc.save("registros_contacto.pdf");
  };

  const downloadJSON = () => {
    const currentDate = new Date().toISOString().slice(0, 10);

    const jsonString = JSON.stringify(records, null, 2);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `records_${currentDate}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" passHref>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-purple-700">Panel de Administración</h1>
          </div>
          <div className="flex justify-end space-x-4 mb-6">
            <Button onClick={downloadTotalPDF} className="bg-purple-600 hover:bg-purple-700">
              <Download className="mr-2 h-4 w-4" /> Descargar total PDF
            </Button>
            <Button onClick={downloadJSON} className="bg-indigo-600 hover:bg-indigo-700">
              <Download className="mr-2 h-4 w-4" /> Descargar total JSON
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.email}>
                  <TableCell>{record.nombre}</TableCell>
                  <TableCell>{record.apellido}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={!!editingRecord} onOpenChange={(open) => !open && setEditingRecord(null)}>
                        <DialogTrigger asChild>
                          <Button onClick={() => handleEdit(record)} variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {editingRecord && (
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Editar Registro</DialogTitle>
                            </DialogHeader>
                            <EditForm record={editingRecord} onSave={handleSave} />
                          </DialogContent>
                        )}
                      </Dialog>
                      <Button onClick={() => handleDelete(record.email)} variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => downloadPDF(record)} className="bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-2 h-4 w-4" />PDF
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

type EditFormProps = {
  record: Record;
  onSave: (record: Record) => void;
};

function EditForm({ record, onSave }: EditFormProps) {
  const [editedRecord, setEditedRecord] = useState<Record>(record);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedRecord({ ...editedRecord, [name]: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setEditedRecord({ ...editedRecord, fecha_nacimiento: date.toISOString() });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedRecord);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" value={editedRecord.nombre} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="apellido">Apellido</Label>
        <Input id="apellido" name="apellido" value={editedRecord.apellido} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={editedRecord.email} onChange={handleChange} disabled />
      </div>
      <div>
        <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              {editedRecord.fecha_nacimiento ? format(parseISO(editedRecord.fecha_nacimiento), "PPP") : <span>Seleccione una fecha</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={editedRecord.fecha_nacimiento ? parseISO(editedRecord.fecha_nacimiento) : undefined}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="sexo">Sexo</Label>
        <select id="sexo" name="sexo" value={editedRecord.sexo} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input id="direccion" name="direccion" value={editedRecord.direccion} onChange={handleChange} />
      </div>
      
      <div>
        <SelectUbication onUbicationChange={(data: { countryName: string; stateName: string; cityName: string }) => {
          setEditedRecord({
            ...editedRecord,
            pais: data.countryName,
            estado: data.stateName,
            ciudad: data.cityName,
          });
        }} />
      </div>
  
      <div>
        <Label htmlFor="observacion">Observación</Label>
        <Textarea id="observacion" name="observacion" value={editedRecord.observacion} onChange={handleChange} />
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
        Guardar Cambios
      </Button>
    </form>
  );
  
}
